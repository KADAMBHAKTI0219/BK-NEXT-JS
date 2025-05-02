import ChatWindow from "@/components/ChatWindow";
import Practice from "@/components/pratcice";
export default function Home() {
  return (
    <>
    <div  className="flex justify-center  min-h-screen bg-gray-200">
    <h1 className="text-3xl text-center font-semibold py-4 bg-gradient-to-l from-blue-400 to-blue-900 bg-clip-text">
      <span className="bg-clip-text">Visa Chatbot</span>
    </h1> 
        <ChatWindow />
        
</div>
    </>
  );
}
