export interface AccountsListModel {
  ID: number;
  name: string;
  creatime: Date;
};

export interface AccountsListDetailModel extends AccountsListModel {
  gm: boolean;
}