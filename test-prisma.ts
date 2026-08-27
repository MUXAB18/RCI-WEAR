import prisma from './src/lib/prisma';

async function main() {
  try {
    const order = await prisma.order.findUnique({
      where: { orderNumber: "ORD-1787826617428-MXULKPKHX" },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                images: true,
              }
            }
          }
        },
        review: true,
      }
    });
    console.log("Success:", order);
  } catch (error) {
    console.error("Prisma error:", error);
  }
}

main();
