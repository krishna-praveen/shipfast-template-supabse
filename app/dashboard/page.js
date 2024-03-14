import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import ButtonAccount from "@/components/ButtonAccount";
export const dynamic = "force-dynamic";
import OptionComponent from "./OptionCompoent";
import UserSurvey from "./UserSurvey";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });
  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <ButtonAccount />
        <h1 className="text-3xl md:text-4xl font-extrabold">Private Page</h1>
        <div className="flex items-center justify-center pt-10">
                    <div>
                        <OptionComponent items={[
                                { id: 'title', title: 'Poll Title' },
                                { id: 'option_1', title: 'Option 1' },
                                { id: 'option_2', title: 'Option 2' },
                                { id: 'option_3', title: 'Option 3' },
                                { id: 'option_4', title: 'Option 4' },
                            ]} 
                            />  
                    </div>    
          </div>
        <div>
            <UserSurvey />
          </div>

      </section>
    </main>
  );
}
