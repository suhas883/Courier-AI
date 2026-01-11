import { Card } from "@/components/ui/card";
import { couriers } from "@shared/schema";

export function CourierGrid() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Supported Couriers
          </h2>
          <p className="mt-2 text-muted-foreground">
            Track packages from 1000+ carriers worldwide
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6">
          {couriers.map((courier) => (
            <Card
              key={courier.code}
              className="flex items-center justify-center p-4 transition-all hover-elevate"
              data-testid={`card-courier-${courier.code}`}
            >
              <div className="flex flex-col items-center gap-2">
                <img
                  src={courier.logo}
                  alt={courier.name}
                  className="h-8 w-8 object-contain grayscale transition-all hover:grayscale-0"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="text-xs text-muted-foreground text-center">
                  {courier.name}
                </span>
              </div>
            </Card>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          And many more...
        </p>
      </div>
    </section>
  );
}
