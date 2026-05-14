type DashboardProps = {
  config: { 
    title: string;
    settings: { theme: string };
  };
}

function Dashboard({ config }: DashboardProps) {
  return (
    <div>
      <h1>{config.title}</h1>
      <p>{config.settings.theme}</p>
    </div>
  );
}

export default Dashboard;