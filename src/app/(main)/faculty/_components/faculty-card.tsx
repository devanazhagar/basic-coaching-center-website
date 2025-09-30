import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { faculty } from "@/lib/data";
import { Star } from "lucide-react";

type FacultyCardProps = {
  member: (typeof faculty)[0];
};

export default function FacultyCard({ member }: FacultyCardProps) {
  const image = PlaceHolderImages.find(p => p.id === member.image);

  return (
    <Card className="text-center transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="items-center pb-4">
        {image && (
          <Image
            src={image.imageUrl}
            alt={member.name}
            width={128}
            height={128}
            className="rounded-full border-4 border-primary/20"
            data-ai-hint={image.imageHint}
          />
        )}
      </CardHeader>
      <CardContent>
        <CardTitle className="font-headline">{member.name}</CardTitle>
        <CardDescription className="text-primary">{member.title}</CardDescription>
        <p className="mt-4 text-sm text-muted-foreground">{member.qualifications}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {member.specialization.split(', ').map(spec => (
            <Badge key={spec} variant="secondary">{spec}</Badge>
          ))}
        </div>
        <div className="mt-4 flex justify-center items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
                <span>{member.rating} ({member.reviews} reviews)</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
