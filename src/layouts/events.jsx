import Events_Hero from '../components/events/EventHero'
import { Outlet } from 'react-router-dom';

export default function Events_Layout() {

    return (
        <div className='flex items-center flex-col'>
            <Events_Hero />
            <div className="w-full min-h-fit flex flex-col">
                <Outlet />
            </div>
        </div>
    )
}