
import './App.css';
// import PaymentComponent from './Components/PaymentComponent';
import CourseCard from './Components/CourseCard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <CourseCard
        courseName="Complete React Native 
        Mobile App developer - Build 10 apps"
        courseThumbnail="https://Link to Image"
        courseDetails="2 Free + 92 Paid"
        coursePrice="2,999"
        courseDiscountedPrice="199"
        courseDiscount="93"
      />
        {/* <PaymentComponent/> */}
      </header>
    </div>
  );
}

export default App;
