import BookmarkButton from "@/components/Button/BookmarkButton";
import Timer from "@/components/Button/Timer";
export default function MyRecipeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
