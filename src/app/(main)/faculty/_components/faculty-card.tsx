import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { faculty } from "@/lib/data";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

type FacultyCardProps = {
  member: (typeof faculty)[0];
};

export default function FacultyCard({ member }: FacultyCardProps) {
  const image = PlaceHolderImages.find(p => p.id === member.image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 h-full">
        <CardHeader className="items-center pb-4">
          {image && (
            <div className="relative">
              <Image
                src={image.imageUrl}
                alt={member.name}
                width={128}
                height={128}
                className="rounded-full border-4 border-primary/20 transition-all duration-300 group-hover:border-primary"
                data-ai-hint={image.imageHint}
              />
            </div>
          )}
        </CardHeader>
        <CardContent>
          <CardTitle className="font-headline">{member.name}</CardTitle>
          <CardDescription className="text-primary">{member.title}</CardDescription>
          <p className="mt-4 text-sm text-muted-foreground">{member.qualifications}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {member.specialization.split(', ').map(spec => (
              <Badge key={spec} variant="secondary" className="transition-colors duration-300 hover:bg-primary hover:text-primary-foreground">{spec}</Badge>
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
    </motion.div>
  );
}
