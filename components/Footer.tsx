export default function Footer(): React.JSX.Element {
  return (
    <footer className=" bg-background w-full justify-between items-center  bottom-0 z-10 p-4 border-t">
      <ul className="grid grid-cols-4 height-[100px] gap-8 items-center">
        <li>Über uns </li>
        <li>Kontakt</li>
        <li>Datenschutz</li>
        <li>Impressum</li>
      </ul>
      <div className="text-center text-sm mt-4">
        &copy; {new Date().getFullYear()} Shoegen. All rights reserved.
      </div>
    </footer>
  );
}
