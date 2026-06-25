import Link from "next/link";

type AuthNavLinkProps = {
  href: string;
  hint: string;
  children: React.ReactNode;
};

export default function AuthNavLink({ href, hint, children }: AuthNavLinkProps) {
  return (
    <p className="text-sm text-muted-foreground text-center w-full">
      {hint}{" "}
      <Link
        href={href}
        className="font-bold text-foreground underline-offset-4 hover:underline"
      >
        {children}
      </Link>
    </p>
  );
}