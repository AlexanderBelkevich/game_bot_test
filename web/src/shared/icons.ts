import gamepad from '../assets/icons/gamepad.svg?raw'
import xbox from '../assets/icons/xbox.svg?raw'
import joycons from '../assets/icons/joycons.svg?raw'
import monitor from '../assets/icons/monitor.svg?raw'
import phone from '../assets/icons/phone.svg?raw'
import clock from '../assets/icons/clock.svg?raw'
import moon from '../assets/icons/moon.svg?raw'
import calendar from '../assets/icons/calendar.svg?raw'
import leaf from '../assets/icons/leaf.svg?raw'
import flame from '../assets/icons/flame.svg?raw'
import book from '../assets/icons/book.svg?raw'
import smile from '../assets/icons/smile.svg?raw'
import user from '../assets/icons/user.svg?raw'
import users from '../assets/icons/users.svg?raw'
import check from '../assets/icons/check.svg?raw'
import cart from '../assets/icons/cart.svg?raw'
import play from '../assets/icons/play.svg?raw'
import share from '../assets/icons/share.svg?raw'

export const icons = { gamepad, xbox, joycons, monitor, phone, clock, moon, calendar, leaf, flame, book, smile, user, users, check, cart, share, play }

// Имя иконки — ключ объекта icons: 'gamepad', 'clock' и т. д.
export type IconName = keyof typeof icons