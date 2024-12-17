import io
import matplotlib.pyplot as plt
import numpy as np

from sklearn.datasets import make_circles,make_moons,make_blobs,make_classification
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import cross_val_score

np.random.seed(42)
ds1, ds1_y = make_circles(n_samples=500, factor=0.1, noise=0.35, random_state=42)

np.random.seed(42)
ds2, ds2_y = make_moons(n_samples=500, noise=0.2, random_state=42)

np.random.seed(42)
ds3, ds3_y = make_blobs(n_samples=500, centers=3, cluster_std=1.0, random_state=42)


def dt(depth, dataset):
    plt.clf()
    if(dataset == "Dataset-1"): X,y=ds1,ds1_y
    if(dataset == "Dataset-2"): X,y=ds2,ds2_y
    if(dataset == "Dataset-3"): X,y=ds3,ds3_y
    clf = DecisionTreeClassifier(max_depth=depth)
    clf.fit(X, y)

    x_range = np.linspace(X.min(), X.max(), 100)
    xx1, xx2 = np.meshgrid(x_range, x_range)
    y_hat = clf.predict(np.c_[xx1.ravel(), xx2.ravel()])
    y_hat = y_hat.reshape(xx1.shape)

    plt.grid()
    plt.contourf(xx1, xx2, y_hat, alpha=0.2)
    plt.scatter(X[:,0],X[:,1],c=y,cmap='viridis', alpha=.7)  
    plt.title("Decision Tree Classifier on "+dataset)

    img_bytes = io.BytesIO()
    plt.savefig(img_bytes, format='png')
    img_bytes.seek(0)
    return img_bytes, np.mean(cross_val_score(clf,X,y,scoring='accuracy',cv=10))
    
def data_set_dt(dataset):
    if(dataset == "Dataset-1"): X,y=ds1,ds1_y
    if(dataset == "Dataset-2"): X,y=ds2,ds2_y
    if(dataset == "Dataset-3"): X,y=ds3,ds3_y

    plt.clf()
    plt.grid()
    plt.scatter(X[:,0],X[:,1],c=y)  
    plt.title("Scatter Plot of "+dataset)

    img_bytes = io.BytesIO()
    plt.savefig(img_bytes, format='png')
    img_bytes.seek(0)
    return img_bytes,0
    

    