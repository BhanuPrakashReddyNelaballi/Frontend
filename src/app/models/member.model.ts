export interface Member {
  memberId: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  membershipStatus: 'ACTIVE' | 'INACTIVE';
  userRole: 'ADMIN' | 'MEMBER';
}