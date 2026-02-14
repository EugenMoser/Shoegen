interface FooterProps {}

export default function Footer({}: FooterProps): React.JSX.Element {
  return (
    <footer className=" bg-background w-full justify-between items-center sticky bottom-0 z-10 p-4 border-t">
      <div className="grid grid-cols-4 height-[100px] gap-8 items-center">
        <div>Über uns </div>
        <div>Kontakt</div>
        <div>Datenschutz</div>
        <div>Impressum</div>
      </div>
      <div className="text-center text-sm mt-4">
        &copy; {new Date().getFullYear()} Shoegen. All rights reserved.
      </div>
    </footer>
  );
}
