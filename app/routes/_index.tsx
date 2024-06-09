import type { MetaFunction } from '@remix-run/node';
import {
  Badge,
  Card,
  ChoiceList,
  IndexFilters,
  IndexFiltersProps,
  IndexTable,
  Page,
  Text,
  useBreakpoints,
  useIndexResourceState,
  useSetIndexFiltersMode,
} from '@shopify/polaris';
import { useCallback, useState } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  const orders = [
    {
      id: '1020',
      order: '#1020',
      date: 'Jul 20 at 4:34pm',
      customer: 'Jaydon Stanton',
      total: '$969.44',
      paymentStatus: <Badge progress='complete'>Paid</Badge>,
      fulfillmentStatus: <Badge progress='incomplete'>Unfulfilled</Badge>,
    },
    {
      id: '1019',
      order: '#1019',
      date: 'Jul 20 at 3:46pm',
      customer: 'Ruben Westerfelt',
      total: '$701.19',
      paymentStatus: <Badge progress='partiallyComplete'>Partially paid</Badge>,
      fulfillmentStatus: <Badge progress='incomplete'>Unfulfilled</Badge>,
    },
    {
      id: '1018',
      order: '#1018',
      date: 'Jul 20 at 3.44pm',
      customer: 'Leo Carder',
      total: '$798.24',
      paymentStatus: <Badge progress='complete'>Paid</Badge>,
      fulfillmentStatus: <Badge progress='incomplete'>Unfulfilled</Badge>,
    },
  ];

  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orders);

  const rowMarkup = orders.map(
    (
      { id, order, date, customer, total, paymentStatus, fulfillmentStatus },
      index
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant='bodyMd' fontWeight='bold' as='span'>
            {order}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{date}</IndexTable.Cell>
        <IndexTable.Cell>{customer}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as='span' alignment='end' numeric>
            {total}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  const [queryValue, setQueryValue] = useState<string | undefined>(undefined);
  const handleFiltersQueryChange = useCallback(
    (value: string) => setQueryValue(value),
    []
  );
  const handleQueryValueRemove = useCallback(
    () => setQueryValue(undefined),
    []
  );

  const [collectionStatus, setCollectionStatus] = useState<
    string[] | undefined
  >(undefined);
  const handleCollectionStatusChange = useCallback(
    (value: string[]) => setCollectionStatus(value),
    []
  );

  const handleFiltersClearAll = useCallback(() => {
    handleQueryValueRemove();
  }, [handleQueryValueRemove]);

  const { mode, setMode } = useSetIndexFiltersMode();

  const [sortSelected, setSortSelected] = useState(['featured asc']);
  const sortOptions: IndexFiltersProps['sortOptions'] = [
    { label: 'Featured', value: 'featured asc', directionLabel: 'Ascending' },
    { label: 'Featured', value: 'featured desc', directionLabel: 'Descending' },
    {
      label: 'Best Selling',
      value: 'bestselling asc',
      directionLabel: 'Ascending',
    },
    {
      label: 'Best Selling',
      value: 'bestselling desc',
      directionLabel: 'Descending',
    },
    {
      label: 'Alphabetically',
      value: 'alphabetically asc',
      directionLabel: 'A-Z',
    },
    {
      label: 'Alphabetically',
      value: 'alphabetically desc',
      directionLabel: 'Z-A',
    },
    { label: 'Date', value: 'date asc', directionLabel: 'old to new' },
    { label: 'Date', value: 'date desc', directionLabel: 'new to old' },
  ];

  return (
    <Page>
      <Card>
        <IndexFilters
          mode={mode}
          setMode={setMode}
          filters={[
            {
              key: 'collections',
              label: 'Collections',
              filter: (
                <ChoiceList
                  title='Collections'
                  choices={[
                    { label: '26mm Watch Band', value: '26mm Watch Band' },
                    {
                      label:
                        'All Watch Accessories (Exclude Apparels and Gift Card)',
                      value:
                        'All Watch Accessories (Exclude Apparels and Gift Card)',
                    },
                    { label: 'APEX Watch Band', value: 'APEX Watch Band' },
                    { label: 'Charge', value: 'Charge' },
                    {
                      label: 'Helmet (LINX, OMNI, SS)',
                      value: 'Helmet (LINX, OMNI, SS)',
                    },
                    { label: 'Lifestyle', value: 'Lifestyle' },
                    { label: 'Mesh Cap', value: 'Mesh Cap' },
                    { label: 'OMNI', value: 'OMNI' },
                    { label: 'POD', value: 'POD' },
                    { label: 'SafeSound', value: 'SafeSound' },
                    { label: 'shipping', value: 'shipping' },
                    {
                      label: 'VERTIX 2 Accessories',
                      value: 'VERTIX 2 Accessories',
                    },
                    {
                      label: 'VERTIX Accessories',
                      value: 'VERTIX Accessories',
                    },
                    { label: 'VERTIX Watch Band', value: 'VERTIX Watch Band' },
                    {
                      label: 'Watch Accessories (excluding bands)',
                      value: 'Watch Accessories (excluding bands)',
                    },
                  ]}
                  selected={collectionStatus || []}
                  onChange={handleCollectionStatusChange}
                />
              ),
            },
          ]}
          queryValue={queryValue}
          onQueryChange={handleFiltersQueryChange}
          onQueryClear={handleQueryValueRemove}
          onClearAll={handleFiltersClearAll}
          selected={0}
          tabs={[]}
          onSort={setSortSelected}
          sortOptions={sortOptions}
          sortSelected={sortSelected}
        />

        <IndexTable
          selectable={false}
          condensed={useBreakpoints().smDown}
          resourceName={resourceName}
          itemCount={orders.length}
          selectedItemsCount={
            allResourcesSelected ? 'All' : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
            { title: 'Order' },
            { title: 'Date' },
            { title: 'Customer' },
            { title: 'Total', alignment: 'end' },
            { title: 'Payment status' },
            { title: 'Fulfillment status' },
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </Card>
    </Page>
  );
}
