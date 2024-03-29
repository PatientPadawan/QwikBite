"use client";

import { api } from "@/trpc/react";
import type { OrderProductsType } from "../types/types";

const OrdersTable = () => {
  const { isLoading, error, data } = api.order.getOrders.useQuery();

  if (isLoading)
    return (
      <tbody>
        <tr>
          <td>Loading...</td>
        </tr>
      </tbody>
    );
  if (error) {
    return (
      <tbody>
        <tr>
          <td>Error...</td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.length > 0
        ? data.map((order) => {
            // converting type of Decimal to string
            const price = order.price as unknown as string;
            // converting type of Prisma.JsonValue to object array
            const products: OrderProductsType =
              order.products as OrderProductsType;

            return (
              <tr
                className={`${order.status !== "Delivered" && "bg-red-50"} text-sm md:text-base`}
                key={order.id}
              >
                <td className="hidden px-1 py-6 md:table-cell md:text-center">
                  {order.id}
                </td>
                <td className="px-1 py-6">{order.createdAt.toDateString()}</td>
                <td className="px-1 py-6">{parseFloat(price).toFixed(2)}</td>
                <td className="hidden px-1 py-6 md:table-cell">
                  {products.map((item) => `${item.title}(${item.quantity}), `)}
                </td>
                <td className="px-1 py-6">{order.status}</td>
              </tr>
            );
          })
        : "No order history"}
    </tbody>
  );
};

export default OrdersTable;
