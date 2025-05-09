import { redirect } from "next/navigation";

const DashboardPage = async () => {
  redirect("/r");
  return null;
};

export default DashboardPage;
