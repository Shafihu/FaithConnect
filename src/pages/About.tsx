
import { SectionHeading } from "@/components/ui/section-heading";
import Layout from "@/components/layout/Layout";
import { Heart, Users } from "lucide-react";

const leadership = [
  {
    name: "Pastor Michael Johnson",
    role: "Senior Pastor",
    bio: "Pastor Michael has been leading our church for over 15 years with wisdom and compassion.",
    image: "/images/pastor-1.jpg"
  },
  {
    name: "Sarah Williams",
    role: "Worship Director",
    bio: "Sarah leads our worship team with passion and a heart for authentic worship.",
    image: "/images/leader-2.jpg"
  },
  {
    name: "David Chen",
    role: "Youth Pastor",
    bio: "David has a special gift for connecting with and mentoring our youth.",
    image: "/images/leader-3.jpg"
  },
  {
    name: "Rebecca Martinez",
    role: "Children's Ministry",
    bio: "Rebecca brings creativity and joy to our children's programs every week.",
    image: "/images/leader-4.jpg"
  }
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-faith-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/images/church-exterior.jpg" 
            alt="Church Exterior" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-faith-950/90 via-faith-800/80 to-faith-950/90" />
        
        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-6 animate-slide-up">
              About Our Church
            </h1>
            <p className="text-xl text-white/80 mb-6 animate-fade-in animate-delay-200">
              FaithConnect is a welcoming community of believers dedicated to sharing God's love and growing together in faith.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <SectionHeading
                subtitle="Our Purpose"
                title="Mission & Vision"
                align="left"
              />
              <div className="space-y-6">
                <div className="border-l-4 border-faith-700 pl-4">
                  <h3 className="text-xl font-medium mb-2 text-faith-900">Our Mission</h3>
                  <p className="text-faith-600">
                    To connect people to Jesus Christ and to one another through worship, discipleship, fellowship, ministry, and mission.
                  </p>
                </div>
                
                <div className="border-l-4 border-faith-700 pl-4">
                  <h3 className="text-xl font-medium mb-2 text-faith-900">Our Vision</h3>
                  <p className="text-faith-600">
                    To be a vibrant community of faith that transforms lives, renews the city, and impacts the world with the love and message of Jesus Christ.
                  </p>
                </div>
                
                <div className="border-l-4 border-faith-700 pl-4">
                  <h3 className="text-xl font-medium mb-2 text-faith-900">Our Values</h3>
                  <ul className="list-disc list-inside text-faith-600 space-y-2">
                    <li>Biblical Authority</li>
                    <li>Authentic Worship</li>
                    <li>Meaningful Community</li>
                    <li>Servant Leadership</li>
                    <li>Passionate Evangelism</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-lg overflow-hidden shadow-md">
                <img 
                  src="/images/mission-1.jpg" 
                  alt="Mission Image" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden shadow-md translate-y-8">
                <img 
                  src="/images/mission-2.jpg" 
                  alt="Mission Image" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden shadow-md translate-y-4">
                <img 
                  src="/images/mission-3.jpg" 
                  alt="Mission Image" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden shadow-md">
                <img 
                  src="/images/mission-4.jpg" 
                  alt="Mission Image" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our History */}
      <section className="py-16 md:py-24 bg-faith-50">
        <div className="container px-4 md:px-6">
          <SectionHeading
            subtitle="Our Journey"
            title="Church History"
            description="Since our founding in 1975, FaithConnect has been a beacon of hope and light in our community."
          />
          
          <div className="relative max-w-4xl mx-auto mt-16">
            {/* Timeline */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-faith-300 transform -translate-x-1/2"></div>
            
            <div className="space-y-16">
              {/* Timeline Item 1 */}
              <div className="relative">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-faith-600 border-4 border-white shadow-sm"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="md:text-right md:pr-8">
                    <h3 className="text-xl font-medium text-faith-900 mb-2">1975: The Beginning</h3>
                    <p className="text-faith-600">
                      Founded by a small group of 20 families with a vision to establish a church focused on Biblical teaching and community outreach.
                    </p>
                  </div>
                  <div className="md:pl-8">
                    <div className="rounded-lg overflow-hidden shadow-md">
                      <img 
                        src="/images/history-1.jpg" 
                        alt="Church History" 
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Timeline Item 2 */}
              <div className="relative">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-faith-600 border-4 border-white shadow-sm"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="md:order-2 md:text-left md:pl-8">
                    <h3 className="text-xl font-medium text-faith-900 mb-2">1990: Growing Together</h3>
                    <p className="text-faith-600">
                      The congregation grew to over 200 members, and we moved to our current location to accommodate our expanding ministries.
                    </p>
                  </div>
                  <div className="md:order-1 md:pr-8">
                    <div className="rounded-lg overflow-hidden shadow-md">
                      <img 
                        src="/images/history-2.jpg" 
                        alt="Church History" 
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Timeline Item 3 */}
              <div className="relative">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-faith-600 border-4 border-white shadow-sm"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="md:text-right md:pr-8">
                    <h3 className="text-xl font-medium text-faith-900 mb-2">2005: New Vision</h3>
                    <p className="text-faith-600">
                      Pastor Michael Johnson became our senior pastor, bringing fresh vision and launching our youth and community outreach programs.
                    </p>
                  </div>
                  <div className="md:pl-8">
                    <div className="rounded-lg overflow-hidden shadow-md">
                      <img 
                        src="/images/history-3.jpg" 
                        alt="Church History" 
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Timeline Item 4 */}
              <div className="relative">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-faith-600 border-4 border-white shadow-sm"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="md:order-2 md:text-left md:pl-8">
                    <h3 className="text-xl font-medium text-faith-900 mb-2">Today: FaithConnect</h3>
                    <p className="text-faith-600">
                      With over 500 members, we continue to grow and adapt to meet the spiritual needs of our community while staying true to our founding vision.
                    </p>
                  </div>
                  <div className="md:order-1 md:pr-8">
                    <div className="rounded-lg overflow-hidden shadow-md">
                      <img 
                        src="/images/history-4.jpg" 
                        alt="Church History" 
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Leadership Team */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <SectionHeading
            subtitle="Meet Our Team"
            title="Leadership"
            description="These dedicated individuals guide our church with wisdom, compassion, and vision."
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {leadership.map((leader, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-faith-100 hover:shadow-md transition-shadow group"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={leader.image} 
                    alt={leader.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-faith-900 mb-1">
                    {leader.name}
                  </h3>
                  <p className="text-faith-600 text-sm mb-3">
                    {leader.role}
                  </p>
                  <p className="text-faith-700">
                    {leader.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Join Our Team */}
          <div className="mt-16 bg-faith-50 rounded-xl p-8 border border-faith-100">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-faith-100 flex items-center justify-center">
                  <Users className="h-8 w-8 text-faith-700" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-medium text-faith-900 mb-2">
                  Join Our Volunteer Team
                </h3>
                <p className="text-faith-600 mb-0">
                  We believe that everyone has gifts and talents that can be used to serve God and others. There are many ways to get involved at FaithConnect.
                </p>
              </div>
              <div className="flex-shrink-0">
                <button className="px-6 py-3 bg-faith-700 hover:bg-faith-800 text-white rounded-md shadow-sm transition-colors">
                  Get Involved
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Beliefs */}
      <section className="py-16 md:py-24 bg-faith-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center bg-faith-700/20 rounded-full px-4 py-1.5 mb-4">
              <Heart className="w-4 h-4 mr-2 text-faith-300" />
              <span className="text-sm font-medium text-faith-300">Our Beliefs</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-white mb-4">
              What We Believe
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Our beliefs are rooted in the Bible and centered on Jesus Christ. Our faith informs our commitment to love and serve our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <h3 className="text-xl font-medium text-white mb-3">The Bible</h3>
              <p className="text-white/80">
                We believe the Bible is God's Word, inspired by the Holy Spirit, and our final authority for faith and practice.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <h3 className="text-xl font-medium text-white mb-3">God</h3>
              <p className="text-white/80">
                We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <h3 className="text-xl font-medium text-white mb-3">Jesus Christ</h3>
              <p className="text-white/80">
                We believe in the deity of Jesus Christ, His virgin birth, sinless life, miracles, atoning death, bodily resurrection, and ascension.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <h3 className="text-xl font-medium text-white mb-3">Salvation</h3>
              <p className="text-white/80">
                We believe salvation is a gift from God received through faith in Jesus Christ alone, not by works.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <h3 className="text-xl font-medium text-white mb-3">The Church</h3>
              <p className="text-white/80">
                We believe the church is the body of Christ, called to worship God and make disciples of all nations.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <h3 className="text-xl font-medium text-white mb-3">Christian Living</h3>
              <p className="text-white/80">
                We believe Christians are called to live holy lives, loving God and loving others as ourselves.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
