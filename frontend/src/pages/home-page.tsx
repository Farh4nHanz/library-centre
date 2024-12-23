import { useAuth } from "@/context/user-context";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="mt-10 h-screen w-full flex justify-center items-center">
      Home Page, {user?.username}
    </div>
  );
};

export default HomePage;
