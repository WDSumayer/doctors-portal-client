
import { DayPicker } from 'react-day-picker';

import chair from '../../../assets/images/chair.png'


const AppointmentBanner = ({selectedDate, setSelectedDate}) => {
    
    return (
        <div>
            <div className="hero bg-base-200">
  <div className="hero-content p-0 flex-col lg:flex-row-reverse">
    <div className='lg:w-1/2'>
    <img src={chair} className="w-full mx-auto md:w-[60%] lg:w-[80%] rounded-lg" alt='' />
    </div>
    <div className='w-full lg:w-1/2'>
      <DayPicker style={{margin:'0em'}}
        mode="single"
        selected={selectedDate}
        // onSelect={setSelectedDate}  // evabe korle kaj hobe but date er upor double click korle error dekhabe.....
        onSelect={(data)=>{
          if(data){
            setSelectedDate(data)  // evabe korle date er upor double click korle error hobe na......
          }
          }}
      ></DayPicker>
     
    </div>
  </div>
</div>
        </div>
    );
};

export default AppointmentBanner;