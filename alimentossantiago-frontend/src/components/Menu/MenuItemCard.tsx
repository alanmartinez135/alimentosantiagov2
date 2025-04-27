import { useState } from "react";
import { MenuItem } from "@/types";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard = ({ item }: MenuItemCardProps) => {
  const { addItem } = useCart();
  const [detailsOpen, setDetailsOpen] = useState(false);

  const imageUrl = item.image || "/placeholder.jpg"; // Fallback si no hay imagen
  const tags = item.tags || [];
  const reviews = item.reviews || [];

  return (
    <>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg menu-item">
        <div className="h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <CardContent className="pt-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-burgundy-900 line-clamp-1">{item.name}</h3>
            <div className="flex items-center text-amber-500 text-sm">
              <Star className="fill-amber-500 stroke-amber-500 h-4 w-4 mr-1" />
              <span>{item.rating?.toFixed(1) ?? "0.0"}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">{item.description}</p>
          <p className="text-burgundy-700 font-semibold">${item.price?.toFixed(2) ?? "0.00"}</p>
        </CardContent>
        <CardFooter className="flex justify-between pt-0">
          <Button
            variant="outline"
            onClick={() => setDetailsOpen(true)}
            className="text-burgundy-700 border-burgundy-700 hover:bg-burgundy-50"
          >
            Detalles
          </Button>
          <Button
            onClick={() => addItem(item)}
            className="bg-burgundy-700 hover:bg-burgundy-800"
          >
            <ShoppingCart className="h-4 w-4 mr-2" /> Agregar
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-burgundy-800 text-2xl">{item.name}</DialogTitle>
            <DialogDescription className="text-gray-600">{item.category}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="rounded-md overflow-hidden h-60">
              <img src={imageUrl} alt={item.name} className="w-full h-full object-cover" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-amber-500">
                <Star className="fill-amber-500 stroke-amber-500 h-5 w-5 mr-1" />
                <span className="font-medium">{item.rating?.toFixed(1) ?? "0.0"}</span>
                <span className="text-gray-500 ml-2">({reviews.length} reseñas)</span>
              </div>
              <div className="text-burgundy-700 text-xl font-bold">${item.price?.toFixed(2) ?? "0.00"}</div>
            </div>

            <p className="text-gray-700">{item.description}</p>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="px-3 py-1 bg-burgundy-50 text-burgundy-700 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {reviews.length > 0 && (
              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium mb-2">Reseñas recientes</h4>
                {reviews.slice(0, 2).map((review) => (
                  <div key={review.id} className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{review.userName}</span>
                      <div className="flex items-center text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < review.rating ? 'fill-amber-500 stroke-amber-500' : 'stroke-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                    <p className="text-xs text-gray-400 mt-1">{review.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              className="bg-burgundy-700 hover:bg-burgundy-800"
              onClick={() => {
                addItem(item);
                setDetailsOpen(false);
              }}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Agregar al carrito
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MenuItemCard;
