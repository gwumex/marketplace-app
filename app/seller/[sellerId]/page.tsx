"use client";

import { getUser } from "@/db/utils";
import ProfilePageContent from "./profilePageContent";
import { useEffect, useState } from "react";
import { User } from "@/db/schema";
import { AlertTriangle } from "lucide-react";
import { SessionProvider, useSession } from "next-auth/react";
const { data: session, status } = useSession(); // The current session


export default function SellerPage({
  params,
}: {
  params: { sellerId: string };
}) {
  const [seller, setSeller] = useState<User | null>(null); // The seller to display on the page

  useEffect(() => {
    /*
      TODO: Get the seller from the database and update the seller state variable.
    */
      if (session && status === "authenticated") {
        async function fetchUser() {
            try {
              const userResult = await getUser(session?.user?.name)
              setSeller(userResult)
            } catch (error) {
              console.log("err:", error);
            }
          }
          fetchUser()
        
      }

  }, [params.sellerId]);

  /* 
    TODO: If the seller is null, return the following error message: 
    */
 if(seller === null) {
      <div className="flex flex-col items-center justify-center h-full">
        <AlertTriangle className="w-16 h-16 text-yellow-400" />
        <span>Seller not found</span>
      </div>
 }

  /* 
    TODO: Otherwise, return the ProfilePageContent component with the seller prop.
  */
  return (
    <SessionProvider>
      {
        <ProfilePageContent seller={seller}/>
      }
    </SessionProvider>
  );
}
