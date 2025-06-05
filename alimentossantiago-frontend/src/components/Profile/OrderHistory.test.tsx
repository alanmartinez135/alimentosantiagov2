it("actualmente no agrega ítems al carrito al hacer clic en 'Volver a pedir'", async () => {
  (fetch as any).mockImplementation((url: string) => {
    if (url.includes("orders")) {
      return Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              id: "order123",
              userId: "user123",
              items: [
                {
                  quantity: 1,
                  menuItemId: "1",
                  menuItem: {
                    id: "1",
                    name: "Pizza",
                    price: 10,
                    description: "Pizza clásica",
                    category: "comida",
                    image: "",
                    tags: [],
                    rating: 4.5,
                    reviews: [],
                    stock: 10,
                  },
                },
              ],
              total: 10,
              status: "pending",
              date: new Date().toISOString(),
              deliveryMethod: "pickup",
            },
          ]),
      });
    }

    if (url.includes("menuItems")) {
      return Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              id: "1",
              name: "Pizza",
              price: 10,
            },
          ]),
      });
    }
  });

  render(<OrderHistory userId="user123" />);

  const reorderButton = await screen.findByText(/volver a pedir/i);
  fireEvent.click(reorderButton);

  await waitFor(() => {
    expect(mockAddItem).not.toHaveBeenCalled();
  });
});
