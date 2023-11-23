import Events_Hero from '../components/events_hero'
import { Outlet } from 'react-router-dom';

export default function Events_Layout() {

    return (
        <>
            <Events_Hero />
            <Outlet />
        </>
    )
}