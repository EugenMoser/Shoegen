interface ShoeDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ShoeDetailsPage({
  params,
}: ShoeDetailsPageProps): Promise<React.JSX.Element> {
  const { id } = await params;
  console.log("----->>>>> id", id);
  return (
    <>
      <h1>Shoe Details Page {id}</h1>
    </>
  );
}
