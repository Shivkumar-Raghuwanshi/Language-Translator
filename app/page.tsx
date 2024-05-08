import { Navbar } from "@/components/navbar";
import TranslateForm from "@/components/Translate";


export default function Home() {
  return (
    <div className="gap-4">
      <Navbar />
      <div className="pt-10">
        <TranslateForm />
      </div>

    </div>
  );
}
