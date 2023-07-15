import useAuth from "@/hooks/useAuth";

export default function TopBar() {
  const user = useAuth();
  return (
    <>
      <div className="flex w-full items-center justify-around h-[58px] bg-zinc-200/20 rounded-xl">
        <div className="w-10/12 text-xl font-semibold text-zinc-200">
          Olá, {user.displayName}
        </div>
        <div className="flex gap-5">
          <div className="">Calendário</div>
          <div className="">Toggle</div>
        </div>
      </div>
    </>
  );
}
