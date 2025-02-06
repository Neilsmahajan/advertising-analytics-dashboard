"use client";

import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { auth, db } from "@/lib/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useRouter } from "@/i18n/routing";

interface QuerySectionProps {
  title: string;
}

/**
 * 
 * @param uid 
 * @param service 
 * @returns 
 */
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
    createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : null,
  }));
  return fetchedQueries;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default function QuerySection({ title }: QuerySectionProps) {
  const [queries, setQueries] = useState<
    { id: string; queryName: string; createdAt: Date | null }[]
  >([]);
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    async function loadQueries() {
      if (user) {
        const fetchedQueries = await fetchUserQueries(user.uid, title);
        setQueries(fetchedQueries);
      } else {
        console.log("No user is authenticated");
      }
    }
    loadQueries();
  }, [title, user]);

  const handleDelete = async (id: string) => {
    if (user) {
      await deleteDoc(doc(db, "queries", id));
      setQueries((prevQueries) =>
        prevQueries.filter((query) => query.id !== id),
      );
    }
  };

  const handleRun = (service: string) => {
    router.push(`/${service.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <Collapsible className="w-full space-y-2">
      <CollapsibleTrigger className="flex w-full items-center justify-start py-2 text-left font-medium hover:underline group">
        <span className="flex items-center">
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 mr-2 group-data-[state=open]:rotate-180" />
          {title}
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
        {queries.length === 0 ? (
          <div className="pl-4 opacity-50">
            No saved queries yet. Queries will appear here once you save them.
          </div>
        ) : (
          queries.map((query) => (
            <div
              key={query.id}
              className="flex flex-col space-y-2 px-4 py-2 bg-transparent rounded-md"
            >
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-white">
                  <strong>Query Name:</strong> {query.queryName}
                </span>
                <span className="text-sm font-medium text-white">
                  <strong>Created At:</strong>{" "}
                  {query.createdAt ? format(query.createdAt, "PPP") : "N/A"}
                </span>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="secondary"
                  className="bg-[#47adbf] hover:bg-[#47adbf]/90 text-white"
                  onClick={() => handleRun(title)}
                >
                  Run
                </Button>
                <Button
                  variant="secondary"
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => handleDelete(query.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
