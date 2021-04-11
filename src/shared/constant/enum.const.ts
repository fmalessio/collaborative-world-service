export enum DONATION_STATE {
    CREATED = 'CREATED',
    READY_TO_TRAVEL = 'READY_TO_TRAVEL',
    PENDING_TO_COLLECT = 'PENDING_TO_COLLECT',
    CANCELLED = 'CANCELLED',
    IN_TRAVEL = 'IN_TRAVEL',
    FINALIZED = 'FINALIZED',
    DONATED_AGAIN = 'DONATED_AGAIN'
}

export const DONATION_STATE_TRANSACTIONS: Record<DONATION_STATE, DONATION_STATE[]> = {
    CREATED: [DONATION_STATE.READY_TO_TRAVEL, DONATION_STATE.CANCELLED],
    READY_TO_TRAVEL: [DONATION_STATE.PENDING_TO_COLLECT, DONATION_STATE.CANCELLED],
    PENDING_TO_COLLECT: [DONATION_STATE.IN_TRAVEL, DONATION_STATE.CANCELLED],
    CANCELLED: [],
    IN_TRAVEL: [DONATION_STATE.FINALIZED],
    FINALIZED: [DONATION_STATE.DONATED_AGAIN],
    DONATED_AGAIN: [DONATION_STATE.FINALIZED]
}

export enum NOTIFICATION_STATE {
    NEW = "NEW",
    READED = "READED"
}