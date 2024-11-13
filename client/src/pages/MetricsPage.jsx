import MetricsBox from "../components/forms/MetricsBox";

const MetricsPage = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6">
      {/* MetricsBox instances */}
      <MetricsBox 
        imageUrl="/docs/images/blog/image-1.jpg" 
        title="Weight" 
        description="Weight in lbs/kilos tracked over time."
        link="#"
      />
      
      <MetricsBox 
        imageUrl="/docs/images/blog/image-2.jpg" 
        title="Waist measurement" 
        description="cm/in"
        link="#"
      />

      <MetricsBox 
        imageUrl="/docs/images/blog/image-3.jpg" 
        title="Hip Measurement" 
        description="cm/in"
        link="#"
      />

      <MetricsBox 
        imageUrl="/docs/images/blog/image-2.jpg" 
        title="Max squat" 
        description="lbs/kilos"
        link="#"
      />

      <MetricsBox 
        imageUrl="/docs/images/blog/image-2.jpg" 
        title="another metric" 
        description="cm/in"
        link="#"
      />
    </div>

    
  );
};

export default MetricsPage;
