'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Recycle, Users, Sprout, BookOpen, Building2, Globe, ArrowRight, CheckCircle2, Leaf, Heart, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BreadcrumbNav } from '@/components/seo/breadcrumb-nav';

// Animated Counter Component
function AnimatedCounter({ 
  target, 
  suffix = '', 
  isActive, 
  duration = 2 
}: { 
  target: number
  suffix?: string
  isActive: boolean
  duration?: number 
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isActive) {
      setCount(0)
      return
    }

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      // Ease out cubic function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(easeOutCubic * target)
      
      setCount(currentCount)
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isActive, target, duration])

  return <span>{count.toLocaleString()}{suffix}</span>
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsAnimated, setStatsAnimated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            setStatsAnimated(true);
          } 
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [statsAnimated]);

  const stats = [
    { value: 500, suffix: '+', label: 'Waste Pickers Empowered' },
    { value: 1000, suffix: '+', label: 'Tons of Waste Diverted' },
    { value: 250, suffix: '+', label: 'Organizations Partnered' },
    { value: 10000, suffix: '+', label: 'Lives Impacted' }
  ];

  const impactAreas = [
    {
      icon: Recycle,
      title: 'Circular Economy Advocacy',
      description: 'We champion the principles of reduce, reuse, and recycle, working with businesses and communities to close the loop on waste. Our programs demonstrate how waste can become a valuable resource, creating economic opportunities while protecting the environment.',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Users,
      title: 'Waste Picker Empowerment',
      description: 'Our flagship initiative supports the backbone of informal waste management. We provide training, safety equipment, fair compensation, and dignity to waste pickers, ensuring they are recognized as essential contributors to the circular economy.',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Sprout,
      title: 'Zero Waste Events',
      description: 'We design and manage large-scale zero waste events that showcase sustainability in action. From concerts to corporate gatherings, we prove that waste-free celebrations are not only possible but also inspiring and impactful.',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: BookOpen,
      title: 'Education & Awareness',
      description: 'Knowledge is power. Our comprehensive Information, Education, and Communication (IEC) programs equip RWAs, businesses, government institutions, and citizens with practical tools to implement sustainable waste management in their daily lives.',
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: Building2,
      title: 'Corporate Partnerships',
      description: 'We collaborate with forward-thinking organizations to establish robust waste collection and recycling systems. These partnerships demonstrate corporate responsibility while creating measurable environmental impact.',
      color: 'from-slate-500 to-gray-600'
    },
    {
      icon: Globe,
      title: 'Community Mobilization',
      description: 'Grassroots change begins with engaged communities. We organize neighborhood clean-up drives, waste segregation workshops, and sustainability challenges that transform residents into environmental champions.',
      color: 'from-teal-500 to-green-600'
    }
  ];

  const projects = [
    {
      title: 'Green Warriors Program',
      status: 'Ongoing',
      description: 'Our Green Warriors Program trains and equips waste pickers with the skills, safety gear, and resources they need to work efficiently and safely. We\'ve partnered with local NGOs to provide health insurance, educational support for their children, and pathways to formal employment.',
      impact: '500+ waste picker families transformed',
      statusColor: 'bg-green-500'
    },
    {
      title: 'Corporate Collection Initiatives',
      status: 'Partnership',
      description: 'Working alongside leading corporations, we\'ve established comprehensive waste collection programs that divert tons of recyclable materials from landfills. Our partnerships with manufacturing units, IT parks, and retail chains demonstrate how businesses can achieve their sustainability goals.',
      impact: 'Tons of materials diverted from landfills',
      statusColor: 'bg-blue-500'
    },
    {
      title: 'Zero Waste Cultural Events',
      status: 'Innovation',
      description: 'We\'ve revolutionized event management by proving that large-scale gatherings can be completely waste-free. From music festivals to community celebrations, our team manages everything from compostable serviceware to on-site recycling stations.',
      impact: '95% of event waste diverted from landfills',
      statusColor: 'bg-amber-500'
    },
    {
      title: 'Sustainability Education Workshops',
      status: 'Community',
      description: 'Our IEC sessions reach thousands of citizens, students, and professionals each year. We conduct interactive workshops on waste segregation, composting, plastic reduction, and circular economy principles.',
      impact: 'Thousands reached annually',
      statusColor: 'bg-cyan-500'
    }
    // {
    //   title: 'Neighborhood Transformation Program',
    //   status: 'Grassroots',
    //   description: 'We work directly with residential welfare associations to implement ward-level waste management systems. This includes door-to-door collection, community composting units, and material recovery facilities.',
    //   impact: '80+ waste segregation achieved',
    //   statusColor: 'bg-emerald-500'
    // }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-green-700 text-white md:py-24 py-12 px-6">
          <BreadcrumbNav variant="light" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTMwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Leaf className="w-8 h-8 animate-pulse" />
              <Badge variant="secondary" className="text-sm px-4 py-1 bg-white/20 text-white border-white/30">
                Social Impact
              </Badge>
            </div>

            <h1 className="text-xl md:text-5xl font-bold mb-6 text-center leading-tight">
              Transforming Communities<br />
              <span className="bg-gradient-to-r from-yellow-200 to-green-200 bg-clip-text text-transparent">
                Through Sustainable Action
              </span>
            </h1>

            <p className="text-base md:text-xl text-center max-w-4xl mx-auto mb-12 text-emerald-50 leading-relaxed">
              At S P Recycling, we believe in creating lasting change through innovative waste management,
              circular economy advocacy, and community empowerment. Together, we're building a cleaner, greener tomorrow.
            </p>

            <div className="flex flex-row md:gap-4 gap-2 justify-center items-center">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 text-lg md:px-8 px-4 py-6 rounded-full shadow-xl transition-all duration-300 hover:scale-105" onClick={() => router.push('/contact')}>
                Partner With Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-emerald-700 hover:text-white hover:bg-white/10 text-lg md:px-8 px-4 py-6 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105" onClick={() => router.push('/about')}>
                Our Mission
              </Button>
            </div>
          </div>

          <div className="absolute -bottom-1 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(248, 250, 252)"/>
            </svg>
          </div>
        </section>

        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 px-4 py-1">Our Vision</Badge>
            <h2 className="text-xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
              Our Vision for Social Impact
            </h2>
            <p className="md:text-lg text-base text-slate-600 max-w-4xl mx-auto leading-relaxed">
              We recognize that true sustainability goes beyond recycling—it's about transforming lives, empowering communities,
              and creating systemic change. Our social impact initiatives are designed to address environmental challenges while
              fostering economic opportunities and social equity.
            </p>
          </div>

          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="p-6 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border-2"
                style={{
                  transitionDelay: `${index * 100}ms`,
                  opacity: statsAnimated ? 1 : 0,
                  transform: statsAnimated ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <div className="md:text-5xl text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent ">
                  <AnimatedCounter 
                    target={stat.value} 
                    suffix={stat.suffix} 
                    isActive={statsAnimated} 
                    duration={2} 
                  />
                </div>
                <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
              </Card>
            ))}
          </div>
        </section>

        <section className=" px-6 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-100 text-blue-700 px-4 py-1">What We Do</Badge>
              <h2 className="text-2xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
                Our Impact Areas
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {impactAreas.map((area, index) => (
                <Card
                  key={index}
                  className="p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 group overflow-hidden relative"
                >
                  <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${area.color} transform transition-all duration-300 group-hover:w-full group-hover:opacity-10`}></div>
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${area.color} flex items-center justify-center mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                      <area.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-slate-800">{area.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{area.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-amber-100 text-amber-700 px-4 py-1">Success Stories</Badge>
            <h2 className="text-2xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
              Featured Social Impact Projects
            </h2>
          </div>

          <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-2xl transition-all duration-500 border-2 group"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-2xl font-bold text-slate-800">{project.title}</h3>
                      <Badge className={`${project.statusColor} text-white`}>
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>{project.impact}</span>
                    </div>
                  </div>
                  {/* <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                      <Target className="w-10 h-10 text-white" />
                    </div>
                  </div> */}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-20 px-6 bg-gradient-to-br from-emerald-600 via-teal-600 to-green-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0zMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Heart className="w-16 h-16 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join the Movement
            </h2>
            <p className="md:text-xl text-base mb-10 text-emerald-50 leading-relaxed">
              Whether you're an individual, business, or community organization, there's a place for you in our mission.
              Together, we can create a sustainable future where waste becomes a resource and every person contributes
              to environmental stewardship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 text-lg px-8 py-6 rounded-full shadow-xl transition-all duration-300 hover:scale-105" onClick={() => router.push('/contact')}>
                Partner With Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-emerald-700 hover:text-white hover:bg-white/10 text-lg md:px-8 px-4 py-6 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105" onClick={() => router.push('/about')}>
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* <footer className="py-12 px-6 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Recycle className="w-8 h-8 text-emerald-400" />
              <span className="text-2xl font-bold">S P Recycling</span>
            </div>
            <p className="text-slate-400 mb-6">
              Creating lasting change through innovative waste management and community empowerment
            </p>
            <div className="text-sm text-slate-500">
              © 2025 S P Recycling. All rights reserved.
            </div>
          </div>
        </footer> */}
      </div>
    </div>
  );
}
