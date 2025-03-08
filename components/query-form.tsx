"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { auth, db } from "@/lib/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

interface Query {
  id: string;
  queryName: string;
  queryData: { [key: string]: string | number | Date };
}

interface QueryFormProps {
  service: string;
  queryFields: { [key: string]: string };
  ResultsComponent: React.ComponentType<{ results: Record<string, unknown> }>;
  onAnalyze: (queryData: { [key: string]: string | number | Date }) => void;
  results: Record<string, unknown>;
  showResults: boolean;
}

async function fetchUserQueries(uid: string, service: string) {
  const q = query(
    collection(db, "queries"),
    where("uid", "==", uid),
    where("service", "==", service),
  );
  const querySnapshot = await getDocs(q);
  const fetchedQueries = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    queryName: doc.data().queryName,
    queryData: doc.data().queryData,
  }));
  return fetchedQueries;
}

/**
 *
 * @param param0
 * @returns
 */
export default function QueryForm({
  service,
  queryFields,
  ResultsComponent,
  onAnalyze,
  results,
  showResults,
}: QueryFormProps) {
  const t = useTranslations("QueryForm");
  const [queryName, setQueryName] = useState("");
  const [queryData, setQueryData] = useState<{
    [key: string]: string | number | Date;
  }>({});
  const [selectedQuery, setSelectedQuery] = useState("");
  const [queries, setQueries] = useState<Query[]>([]);
  const [user] = useAuthState(auth);
  const [isQuerySelected, setIsQuerySelected] = useState(false);
  const [showPropertyId, setShowPropertyId] = useState(false);
  const [showCustomerId, setShowCustomerId] = useState(false);
  // New states for Meta Ads fields
  const [showAdAccountId, setShowAdAccountId] = useState(false);
  const [showAccessToken, setShowAccessToken] = useState(false);
  // New states for Microsoft Ads fields
  const [showAccountIdMS, setShowAccountIdMS] = useState(false);
  const [showCustomerIdMS, setShowCustomerIdMS] = useState(false);

  useEffect(() => {
    async function loadQueries() {
      if (user) {
        const fetchedQueries = await fetchUserQueries(user.uid, service);
        setQueries(fetchedQueries);
      }
    }
    loadQueries();
  }, [user, service]);

  const handleQuerySelect = (value: string) => {
    setSelectedQuery(value);
    setIsQuerySelected(true);
    if (value === "new") {
      setQueryName("");
      setQueryData({});
    } else {
      const selected = queries.find((query) => query.id === value);
      if (selected) {
        setQueryName(selected.queryName);
        setQueryData(selected.queryData);
      }
    }
  };

  const handleInputChange = (field: string, value: string | number | Date) => {
    setQueryData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSaveQuery = async () => {
    if (user) {
      const queryDataToSave = {
        queryName,
        queryData,
        service,
        uid: user.uid,
        createdAt: new Date(),
      };

      try {
        if (selectedQuery === "new") {
          // Create a new document with an auto-generated ID
          const newDocRef = doc(collection(db, "queries"));
          await setDoc(newDocRef, queryDataToSave);
          setSelectedQuery(newDocRef.id);
        } else {
          // Overwrite the existing document
          await setDoc(doc(db, "queries", selectedQuery), queryDataToSave);
        }
        console.log("Query saved successfully");

        // Re-fetch the queries and update the state
        const fetchedQueries = await fetchUserQueries(user.uid, service);
        setQueries(fetchedQueries);

        // Update the selected query to reflect the newly saved query
        const savedQuery = fetchedQueries.find(
          (query) => query.queryName === queryName,
        );
        if (savedQuery) {
          setSelectedQuery(savedQuery.id);
        }
      } catch (error) {
        console.error("Error saving query:", error);
      }
    } else {
      alert("Please sign in to save your query.");
    }
  };

  const handleAnalyze = () => {
    onAnalyze(queryData);
  };

  return (
    <section className="space-y-6 max-w-4xl">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("previousQueries")}
          </label>
          <Select onValueChange={handleQuerySelect} value={selectedQuery}>
            <SelectTrigger className="bg-white/20 border-none text-white">
              <SelectValue placeholder={t("selectQuery")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">{t("newQuery")}</SelectItem>
              {queries.map((query) => (
                <SelectItem key={query.id} value={query.id}>
                  {query.queryName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {t("queryName")}
          </label>
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder={t("enterQueryName")}
              value={queryName}
              onChange={(e) => setQueryName(e.target.value)}
              className="bg-white/20 border-none text-white placeholder:text-white/60"
              disabled={!isQuerySelected}
            />
            <Button
              onClick={handleSaveQuery}
              className="bg-[#47adbf] hover:bg-[#47adbf]/90 text-white"
              disabled={!isQuerySelected}
            >
              {t("saveQuery")}
            </Button>
          </div>
        </div>

        {Object.keys(queryFields).map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium mb-2">
              {queryFields[field]}
            </label>
            {(service === "Google Analytics" && field === "propertyID") ||
            (service === "Google Ads" && field === "customerId") ||
            (service === "Meta Ads" &&
              (field === "adAccountId" || field === "accessToken")) ||
            (service === "Microsoft Ads" &&
              (field === "accountId" || field === "customerId")) ? (
              <div className="flex gap-2 items-center">
                <Input
                  type={
                    service === "Google Analytics" && field === "propertyID"
                      ? showPropertyId
                        ? "text"
                        : "password"
                      : service === "Google Ads" && field === "customerId"
                        ? showCustomerId
                          ? "text"
                          : "password"
                        : service === "Meta Ads" && field === "adAccountId"
                          ? showAdAccountId
                            ? "text"
                            : "password"
                          : service === "Meta Ads" && field === "accessToken"
                            ? showAccessToken
                              ? "text"
                              : "password"
                            : service === "Microsoft Ads" &&
                                field === "accountId"
                              ? showAccountIdMS
                                ? "text"
                                : "password"
                              : service === "Microsoft Ads" &&
                                  field === "customerId"
                                ? showCustomerIdMS
                                  ? "text"
                                  : "password"
                                : "text"
                  }
                  placeholder={t("enter") + " " + queryFields[field]}
                  value={
                    queryData[field] instanceof Date
                      ? queryData[field].toISOString().split("T")[0]
                      : queryData[field] || ""
                  }
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  className="bg-white/20 border-none text-white placeholder:text-white/60"
                  disabled={!isQuerySelected}
                />
                <Button
                  onClick={() =>
                    service === "Google Analytics" && field === "propertyID"
                      ? setShowPropertyId((prev) => !prev)
                      : service === "Google Ads" && field === "customerId"
                        ? setShowCustomerId((prev) => !prev)
                        : service === "Meta Ads" && field === "adAccountId"
                          ? setShowAdAccountId((prev) => !prev)
                          : service === "Meta Ads" && field === "accessToken"
                            ? setShowAccessToken((prev) => !prev)
                            : service === "Microsoft Ads" &&
                                field === "accountId"
                              ? setShowAccountIdMS((prev) => !prev)
                              : service === "Microsoft Ads" &&
                                  field === "customerId"
                                ? setShowCustomerIdMS((prev) => !prev)
                                : null
                  }
                  className="bg-[#47adbf] hover:bg-[#47adbf]/90 text-white min-w-[auto] px-2"
                  disabled={!isQuerySelected}
                >
                  {service === "Google Analytics" && field === "propertyID"
                    ? showPropertyId
                      ? "Hide"
                      : "Show"
                    : service === "Google Ads" && field === "customerId"
                      ? showCustomerId
                        ? "Hide"
                        : "Show"
                      : service === "Meta Ads" && field === "adAccountId"
                        ? showAdAccountId
                          ? "Hide"
                          : "Show"
                        : service === "Meta Ads" && field === "accessToken"
                          ? showAccessToken
                            ? "Hide"
                            : "Show"
                          : service === "Microsoft Ads" && field === "accountId"
                            ? showAccountIdMS
                              ? "Hide"
                              : "Show"
                            : service === "Microsoft Ads" &&
                                field === "customerId"
                              ? showCustomerIdMS
                                ? "Hide"
                                : "Show"
                              : "Show"}
                </Button>
              </div>
            ) : (
              <Input
                type={field.includes("Date") ? "date" : "text"}
                placeholder={t("enter") + " " + queryFields[field]}
                value={
                  queryData[field] instanceof Date
                    ? queryData[field].toISOString().split("T")[0]
                    : queryData[field] || ""
                }
                onChange={(e) => handleInputChange(field, e.target.value)}
                className="bg-white/20 border-none text-white placeholder:text-white/60"
                disabled={!isQuerySelected}
              />
            )}
          </div>
        ))}

        <div className="pt-4">
          <Button
            onClick={handleAnalyze}
            className="bg-[#47adbf] hover:bg-[#47adbf]/90 text-white"
            disabled={!isQuerySelected}
          >
            {t("analyze")}
          </Button>
        </div>
      </div>
      {showResults && <ResultsComponent results={results} />}
    </section>
  );
}
