import numpy as np
import sys

if (len(sys.argv) < 2):
    sys.exit(1)

np.random.seed(int(sys.argv[1]))


t = np.random.randn(np.random.randint(1,10), np.random.randint(1,1001), np.random.randint(1, 10001));
a = np.load('./o.npy')




if (np.array(a==t).all()):
    sys.exit(0)
else:
    sys.exit(1)
