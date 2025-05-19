import { Card, CardContent } from "@/app/components/ui/card";

export default function ExecutiveCard({ executive, onClick }) {
  return (
    <Card
      onClick={() => onClick(executive.id)}
      className="cursor-pointer hover:shadow-xl transition"
    >
      {/* Always render the image with fallback */}
      <img
        src={executive.photo || "/assets/default_user_img_placeholder.jpg"}
        alt={`${executive.name}'s photo`}
          onError={(e) => {
            e.target.onerror = null; // Prevent looping
            e.target.src = "/assets/default_user_img_placeholder.jpg";
          }}
        className="w-full h-40 object-cover rounded-t-md"
      />

      <CardContent>
        <div className="font-bold text-lg">{executive.name}</div>
        <div className="text-sm">{executive.rank}</div>
        <div className="text-sm text-muted-foreground">{executive.society}</div>


                {/* Status with color */}
        <div
          className={`text-sm font-semibold mt-1 ${
            executive.status === "Current" ? "text-green-600" : "text-red-600"
          }`}
        >
          {executive.status}
        </div>
      </CardContent>
    </Card>
  );
}
