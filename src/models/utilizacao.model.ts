export interface Utilizacao {
    dataInicio: Date;
    dataFim: Date | null;
    idMotorista: number;
    idAutomovel: number;
    motivo: string;
}