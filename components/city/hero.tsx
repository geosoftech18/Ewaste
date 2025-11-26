"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf } from "lucide-react"
import { useRouter } from "next/navigation";
import { PickupFormModal } from "../pickup-form-modal";
import { useState } from "react";

interface HeroProps {
  cityName?: string;
  cityDescription?: string;
  heroImage?: string;
  stats?: {
    totalPickups: string;
    totalWeight: string;
    satisfactionRate: string;
  };
}

export function Hero({ 
  cityName = "Hyderabad", 
  cityDescription = "SP Recycling Pvt Ltd pioneers sustainable e-waste management in Hyderabad. Our cutting-edge facility ensures maximum material recovery with zero environmental impact.",
  heroImage = "/city/e-waste-recycling-facility-with-circuit-boards-and.jpg",
  stats = {
    totalPickups: "2,500+",
    totalWeight: "450+ tons", 
    satisfactionRate: "98%"
  }
}: HeroProps) {
  const router = useRouter();
  const [pickupModalOpen, setPickupModalOpen] = useState(false);
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-10 sm:py-32 lg:py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="animate-slide-in-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-6">
              <Leaf className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">LEED Platinum Certified</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
              E-Waste Recycling in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {cityName}
              </span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {cityDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group" onClick={() => setPickupModalOpen(true)}>
           
                Request Pickup Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary !text-primary hover:bg-primary/5 bg-transparent"
                onClick={() => router.push(`/services`)}
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-border">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary">{stats.totalPickups}</div>
                <p className="text-sm text-muted-foreground">Total Pickups</p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary">{stats.totalWeight}</div>
                <p className="text-sm text-muted-foreground">Recycled</p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary">{stats.satisfactionRate}</div>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 sm:h-[500px] animate-slide-in-right">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
              <img
                src={heroImage}
                alt={`E-waste recycling facility in ${cityName}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-lg bg-primary/20 blur-2xl" />
          </div>
        </div>
      </div>  {/* Pickup Form Modal */}
      <PickupFormModal 
        open={pickupModalOpen} 
        onOpenChange={setPickupModalOpen} 
      />
    </section>
  )
}
