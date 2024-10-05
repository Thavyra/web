import type { Metadata } from "next";
import "./globals.css";
import NavLink from "@/components/nav/NavLink";
import { signOut } from "@/auth";
import { getCurrentUser } from "@/actions/account";

export const metadata: Metadata = {
  title: "Thavyra",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser()

  return (
    <html lang="en">
      <body className="antialiased box-border h-screen bg-dark-850">

        <div className="h-full sm:flex sm:flex-row sm:py-10">
          <div className="h-full flex flex-col bg-dark-800 text-light px-8 sm:basis-8/12 sm:mx-auto sm:rounded sm:shadow-xl">

            <main className="h-full">

              {children}

            </main>

            <footer className="mt-auto">
              <hr className="border-dark-700" />

              <div className="my-5 md:flex md:flex-row">

                <nav className="mb-0 sm:flex sm:justify-center sm:gap-2 sm:mb-3 md:mb-0 md:mr-auto md:gap-4">

                  <span className="text-center text-bright block mb-3 sm:mb-0">{user.username}</span>

                  <NavLink href="/account" match="prefix" activeClassName="font-bold"
                    className="text-center block mb-3 sm:mb-0">Account</NavLink>

                  <NavLink href="/dev" match="prefix" activeClassName="font-bold"
                    className="text-center block mb-3 sm:mb-0">Developer</NavLink>

                  <form action={async () => {
                    "use server"
                    await signOut({redirectTo: "/"})
                  }}>
                    <button className="text-center w-full mb-3 sm:mb-0 sm:inline" type="submit">Logout</button>
                  </form>

                </nav>

                <div className="text-center">
                  <span className="xl:absolute xl:left-1/2 xl:-translate-x-1/2">Thavyra</span>

                  <span className="xl:ml-auto"> by <a className="text-bright" href="https://tobymeehan.com">Toby Meehan</a> &copy;</span>
                </div>

              </div>
            </footer>

          </div>
        </div>

      </body>
    </html>
  );
}
