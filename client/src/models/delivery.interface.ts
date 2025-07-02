

export interface IDelivery {
    _id: string;
    payment: string;
    address: string;
    deliveryDate: string;
    status: 'Pending' | 'Delivered' | 'Failed' | 'Cancelled' | 'Shipped';
    isBlocked?: boolean;
    createdAt: string;
    updatedAt?: string;
}
