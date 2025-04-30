import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
import client from "../../tina/__generated__/client";
import Link from "next/link";

type LayoutProps = PropsWithChildren & {
  rawPageData?: any;
};

export default async function Layout({ children, rawPageData }: LayoutProps) {
  const { data: globalData } = await client.queries.global({
    relativePath: "index.json",
  },
    {
      fetchOptions: {
        next: {
          revalidate: 60,
        },
      }
    }
  );

  return (
    <LayoutProvider globalSettings={globalData.global} pageData={rawPageData}>
      <div className="flex justify-center">
        <div className="flex text-muted-foreground">
          <Link href="/" className="p-2 md:p-3 hover:underline">Start</Link>
          <div className="p-2 md:p-3">|</div>
          <a href= "mailto:kontakt.bajenbloggen@gmail.com" className="p-2 md:p-3 hover:underline">kontakt.bajenbloggen@gmail.com</a>
        </div>
      </div>
      <main className="overflow-x-hidden md:pt-10 pb-20">
        {children}
      </main>
    </LayoutProvider>
  );
}
