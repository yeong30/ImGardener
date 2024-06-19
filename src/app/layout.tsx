import React from "react";

export const metadata = {
  title: "Im Gardener...",
  description: "ImGardener aims to provide gardener to the plants Info with all they need",
};

function Layout({ children }: any) {
  console.log("this");
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
export default Layout;
