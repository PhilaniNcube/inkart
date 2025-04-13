import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { fetchProfiles } from "@/lib/fetchers/profiles";

type SearchParams = Promise<{ [key: string]: string  | undefined }>

const page = async (props: {
  searchParams: SearchParams
}) => {

  const searchParams = await props.searchParams;
  const { page } = searchParams;

  const currentPage  = page ? parseInt(page) : 1;

  const {profiles, count} = await fetchProfiles(currentPage, 10);

  return <div className="w-full">
    <Table className="w-2/3">
      <TableRow>
        <TableHead>Customer ID</TableHead>
        <TableHead>First Name</TableHead>
        <TableHead>Last Name</TableHead>
      </TableRow>
      <TableBody>
        {profiles.map((profile) => {
          return (
            <TableRow key={profile.id}>
              <TableCell>{profile.id}</TableCell>
              <TableCell>{profile.first_name}</TableCell>
              <TableCell>{profile.last_name}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  </div>;
};
export default page;
