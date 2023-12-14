import Events_Hero from '../components/events/events_hero'
import { Outlet } from 'react-router-dom';

export default function Events_Layout() {

    return (
        <>
            <Events_Hero />
            <div className="w-[75rem] min-h-fit mx-auto flex flex-col">
                <Outlet />
            </div>
        </>
    )
}