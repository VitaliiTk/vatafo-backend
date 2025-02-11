export const errorEndpoit = (_, res) => {
  res.status(404).send({ error: 'Такого маршрута не существует' })
}
