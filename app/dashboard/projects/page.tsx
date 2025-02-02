// import { DashboardHeader } from '@/libs/components/dashboard';
import ProjectsPage from '@/components/dashboard/Projectpage';
import { Sidebar } from '@/components/layout/Sidebar';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import "../globals.css"


export default async function MyAccount() {
    

    
    return (
        <DashboardLayout>
           <ProjectsPage />
        </DashboardLayout>
    );
}





