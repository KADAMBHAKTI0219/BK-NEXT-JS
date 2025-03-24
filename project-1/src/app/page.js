import About from "@/components/about";
import FloorPlan from "@/components/floorPlans";
import PaymentPage from "@/components/payment";
import Image from "next/image";

export default function Home() {
  return (
  <>
    <About/>
    <PaymentPage/>
    <FloorPlan/>
  </>
  );
}
