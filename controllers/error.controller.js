export const errorEndpoit = (_, res) => {
  res.status(404).send({ message: 'Такого маршрута не существует' })
}
