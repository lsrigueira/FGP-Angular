import {Player, Country} from './player';

export interface Team{
    $key ?: string;
    name: string;
    nationality: Country;
    players: Player[];
}
