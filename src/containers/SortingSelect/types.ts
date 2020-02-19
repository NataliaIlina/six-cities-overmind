export interface ComponentProps {}

export interface StateProps {
  sorting: string;
}

export interface DispatchProps {
  changeSorting: (option: string) => void;
}

export type SortingSelectProps = ComponentProps & StateProps & DispatchProps;
