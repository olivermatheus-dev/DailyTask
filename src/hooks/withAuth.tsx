import { useRouter } from "next/navigation";

import useAuth from "./useAuth";

export const withAuth = (Component: React.ElementType) => {
  const Auth = (props: any) => {
    const router = useRouter();
    const user = useAuth();

    if (!user) {
      router.push("/login");
      return null;
    }

    return <Component {...props} />;
  };

  return Auth;
};
