import Title from "./components/Title";
import Header from "./components/Header";
import Form from "./components/Form";
import SectionTitle from "./components/SectionTitle";
import Card from "./components/Card";

function App() {
  const dummy = [
    {
      title: 'Cuci Baju',
      deadline: '22/12/2021',
    },
    {
      title: 'Cuci Mobil',
      deadline: '23/12/2021',
    },
    {
      title: 'Sapu Halaman',
      deadline: '23/12/2021',
    },
    {
      title: 'Mancing Masalah',
      deadline: '24/12/2021',
    },
  ];

  return (
    <div className="container max-w-screen-md mx-auto font-sans">
      <Title />
      <Header />
      <Form />
      <SectionTitle title="Task List" />
      {dummy.map((task) => (
        <Card taskTitle={task.title} taskDeadline={task.deadline} />
      ))}
    </div>
  );
}

export default App;
