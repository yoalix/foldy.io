import { redirect } from "next/navigation";

type Props = {
  params: {
    username: string;
    folderId: string;
  };
};

export default function EditPage({ params }: Props) {
  redirect(`/profile/${params.username}/folder/${params.folderId}`);
  return null;
}
